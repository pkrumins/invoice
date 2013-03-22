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
