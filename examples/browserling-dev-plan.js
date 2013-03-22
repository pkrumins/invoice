invoice = require('../index.js');
invoice(
    {
        template: __dirname + '/../templates/browserling.tex',
        from: "browserling inc",
        to: "google",
        period: "jan 12 - feb 12",
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
