/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv/config");
const express = require("express");

const db = require("./database");
const ClientError = require("./client-error");
const staticMiddleware = require("./static-middleware");
const sessionMiddleware = require("./session-middleware");

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get("/api/health-check", (req, res, next) => {
  db.query("select 'successfully connected' as \"message\"")
    .then((result) => res.json(result.rows[0]))
    .catch((err) => next(err));
});

// Get all products
app.get("/api/products", (req, res, next) => {
  const sql = `select "productId",
                      "name",
                      "price",
                      "image",
                      "shortDescription"
                 from "products"`;
  db.query(sql)
    .then((result) => res.json(result.rows))
    .catch((err) => next(err));
});

// Get product details
app.get("/api/products/:productId", (req, res, next) => {
  const sql = `select *
                 from "products"
                where "productId" = $1`;
  const val = [req.params.productId];
  db.query(sql, val)
    .then((result) => {
      if (result.rows.length === 0) {
        next(
          new ClientError(`cannot find productId ${req.params.productId}`, 404),
        );
      } else {
        return res.json(result.rows[0]);
      }
    })
    .catch((err) => next(err));
});

// get cart info from session
app.get("/api/cart", (req, res, next) => {
  if (!req.session.cartId) {
    return res.json([]);
  } else {
    const sql = `select "c"."cartItemId",
                        "c"."price",
                        "c"."quantity",
                        "p"."productId",
                        "p"."image",
                        "p"."name",
                        "p"."shortDescription"
                   from "cartItems" as "c"
                   join "products" as "p" using ("productId")
                  where "c"."cartId" = $1
                  order by "cartItemId"`;
    const val = [req.session.cartId];
    db.query(sql, val)
      .then((result) => res.json(result.rows))
      .catch((err) => next(err));
  }
});

// Add prodcut to cart
app.post("/api/add_to_cart", (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    next(new ClientError('"productId" is required', 400));
  } else if (typeof productId !== "number" || productId < 0) {
    next(new ClientError('"productId" must be a positive number', 400));
  }

  const sql = `select "price"
  from "products"
  where "productId" = $1`;
  const val = [productId];
  // Get price for prduct in DB
  db.query(sql, val)
    .then((first) => {
      if (first.rows.length === 0) {
        throw new ClientError(`Cannot find productId ${productId}`, 400);
      } else if (req.session.cartId) {
        // If cart exists return cart info plus price
        return {
          cartId: req.session.cartId,
          price: first.rows[0].price,
        };
      } else {
        const sql = `insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"`;
        return db.query(sql).then((data) => {
          const { cartId } = data.rows[0];
          req.session["cartId"] = cartId;
          return {
            cartId,
            price: first.rows[0].price,
          };
        });
      }
    })
    .then((second) => {
      const { cartId, price } = second;
      // Check to see if cartItem is already in a cart
      const s = `select * from "cartItems"
      where "cartId" = $1
      and "productId" = $2`;
      const v = [cartId, productId];
      return db.query(s, v).then((result) => {
        if (result.rows.length) {
          const sql = `update "cartItems" 
          set "quantity" = "quantity" + 1 
          where "cartId" = $1 and "productId" = $2
          returning "cartItemId"`;
          const val = [cartId, productId];
          return db.query(sql, val);
        }
        const sql = `insert into "cartItems" ("cartId", "productId", "price", "quantity")
                          values ($1, $2, $3, $4)
                       returning "cartItemId"`;
        const values = [cartId, productId, price, 1];
        return db.query(sql, values);
      });
    })
    .then((result) => {
      const sql = `select "c"."cartItemId",
                          "c"."price",
                          "c"."quantity",
                          "p"."productId",
                          "p"."image",
                          "p"."name",
                          "p"."shortDescription"
                     from "cartItems" as "c"
                     join "products" as "p" using ("productId")
                    where "c"."cartItemId" = $1`;
      const value = [result.rows[0].cartItemId];
      return db.query(sql, value).then((result) => {
        res.status(201).json(result.rows[0]);
      });
    })
    .catch((err) => next(err));
});

app.post("/api/remove_from_cart", (req, res, next) => {
  const { cartId } = req.session;
  const { productId } = req.body;
  const s = `select * from "cartItems"
            where "cartId" = $1 
            and "productId" = $2`;
  const v = [cartId, productId];
  db.query(s, v)
    .then((first) => {
      if (first.rows[0].quantity > 1) {
        const sql = `update "cartItems" 
          set "quantity" = "quantity" - 1 
          where "cartId" = $1 and "productId" = $2
          returning "quantity", "productId"`;
        const val = [cartId, productId];
        return db.query(sql, val);
      }
      const sql = `delete from "cartItems"
                   where "productId" = $1`;
      const val = [productId];
      return db.query(sql, val);
    })
    .then((result) => {
      if (result.rows.length) {
        res.status(201).json(result.rows[0]);
      } else {
        res.status(201).json({ productId, quantity: 0 });
      }
    })
    .catch((error) => next(error));
});

// Place order
app.post("/api/orders", (req, res, next) => {
  const { cartId } = req.session;
  if (!cartId) {
    console.log("no cart Id stored");
    next(new ClientError("no cart id stored", 400));
  } else if (!req.body.name) {
    console.log("no name");
    next();
  } else if (!req.body.creditCard) {
    console.log("no Credit Card");
    next(new ClientError("A credit card number is required", 400));
  } else if (!req.body.shippingAddress) {
    console.log("no Address");
    return next(new ClientError("A shipping address is required", 400));
  }
  const sql = `insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
                    values ($1, $2, $3, $4)
                 returning "createdAt",
                           "creditCard",
                           "name",
                           "orderId",
                           "shippingAddress"`;
  const values = [
    cartId,
    req.body.name,
    req.body.creditCard,
    req.body.shippingAddress,
  ];
  db.query(sql, values)
    .then((response) => {
      delete req.session.cartId;
      return res.status(201).json(response.rows[0]);
    })
    .catch((err) => next(err));
});

app.use("/api", (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: "an unexpected error occurred",
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log("Listening on port", process.env.PORT);
});
