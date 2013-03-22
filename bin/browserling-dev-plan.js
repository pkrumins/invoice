var invoice = require('../');
var argv = require('optimist')
    .usage('Usage: $0 --to <to> --period <period> --amount <amount>')
    .demand(['to', 'period', 'amount'])
    .argv;

if (!/\$/.test(argv.amount)) {
    argv.amount = "$" + argv.amount;
}

invoice(
    {
        template: __dirname + '/../templates/browserling-dev-plan.tex',
        from: "Browserling inc\\\\3276 Logan Street\\\\Oakland, CA 94601\\\\USA",
        to: argv.to,
        period: argv.period,
        amount: argv.amount
    },
    function (err, pdf) {
        if (err) {
            console.log("Failed creating the invoice: " + err);
            return;
        }
        console.log("Pdf invoice: " + pdf);
    }
);
