const form = require("express-form")
const filter = form.filter
const validate = form.validate

const barsForm = form(
    filter("name").trim().toUpperCase(),
    filter("adresse").trim().toUpperCase(),
    filter("tel").trim(),
    filter("email").trim(),
    filter("description").trim().toUpperCase(),

    validate("name").required(),
    validate("adresse").required(),
    validate("email").required(),

)

const biereForm = form(
    filter("name").trim().toUpperCase(),
    filter("description").trim().toUpperCase(),
    filter("degree").trim(),
    filter("prix").trim(),

    validate("name").required(),
    validate("degree").required(),
    validate("prix").required().isFloat({min: 0}),

)

const commandeForm = form(
    filter("prix").trim(),
    filter("date").trim(),
    filter("status").trim().toUpperCase(),

    validate("prix").required().isFloat({min: 0}),
    validate("date").required(),
    validate("status").required(),
)

const biereCommandeForm = form(
)

module.exports = { }