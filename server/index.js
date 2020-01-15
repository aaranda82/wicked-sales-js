require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `select "productId",
                      "name",
                      "price",
                      "image",
                      "shortDescription"
                 from "products"`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const sql = `select *
                 from "products"
                where "productId" = $1`;
  const val = [req.params.productId];
  db.query(sql, val)
    .then(result => {
      if (result.rows.length === 0) {
        next(new ClientError(`cannot find productId ${req.params.productId}`, 404));
      } else {
        return res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});
/// ////////////////////////////////////////////

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.json([]);
  } else {
    const sql = `select "c"."cartItemId",
                        "c"."price",
                        "p"."productId",
                        "p"."image",
                        "p"."name",
                        "p"."shortDescription"
                   from "cartItems" as "c"
                   join "products" as "p" using ("productId")
                  where "c"."cartId" = $1`;
    const val = [req.session.cartId];
    db.query(sql, val)
      .then(result => res.send(result.rows));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (!productId) {
    res.status(400).send('"productId" is required');
  } else if (typeof productId !== 'number' || productId < 0) {
    res.status(400).send('"productId" must be a positive number');
  }
  const sql = `select "price"
                 from "products"
                where "productId" = $1`;
  const val = [productId];
  db.query(sql, val)
    .then(data => {
      if (data.rows.length === 0) {
        throw new ClientError(`cannot find productId ${productId}`, 400);
      } else if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: data.rows[0].price
        };
      } else {
        const sql = `insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"`;
        return db.query(sql)
          .then(result => {
            return {
              cartId: result.rows[0].cartId,
              price: data.rows[0].price
            };
          });
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `insert into "cartItems" ("cartId", "productId", "price")
                        values ($1, $2, $3)
                     returning "cartItemId"`;
      const values = [result.cartId, productId, result.price];
      return db.query(sql, values);

    })
    .then(result => {
      const sql = `select "c"."cartItemId",
                          "c"."price",
                          "p"."productId",
                          "p"."image",
                          "p"."name",
                          "p"."shortDescription"
                     from "cartItems" as "c"
                     join "products" as "p" using ("productId")
                    where "c"."cartItemId" = $1`;
      const value = [result.rows[0].cartItemId];
      db.query(sql, value)
        .then(result => { res.status(201).send(result.rows[0]); });
    })
    .catch(err => next(err));
});

/// //////////////////////////////////////////
app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
