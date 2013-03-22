Invoice
=======

Generate pdf invoices from latex!

Example
=======

````javascript
var invoice = require('../index.js');
invoice(
    {
        template: __dirname + '/../templates/browserling-dev-plan.tex',
        from: "Browserling inc\\\\3276 Logan Street\\\\Oakland, CA 94601\\\\USA",
        to: "Google",
        period: "Jan 12 - Feb 12",
        amount: "$20"
    },
    function (err, pdf) {
        if (err) {
            console.log("Failed creating the invoice: " + err);
            return;
        }
        console.log("Pdf invoice: " + pdf);
    }
);
````

Description
===========

Invoice uses `pdflatex` to generate pdfs from latex, so make sure you've `pdflatex` installed.

The `invoice` function has the following prototype:

    invoice(options, cb)

Mandatory `options` are:

* `template` - path to latex template
* `from` - from field
* `to` - to field
* `period` - time period
* `amount` - cash amount

Callback is `function (err, pdf)`, where `pdf` is path to the generated document. If an error occurs, `err` is set.

Installation
============

Using [npm](http://npmjs.org):

    npm install invoice

