<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Example 1</title>
</head>
<style>
    .clearfix:after {
        content: "";
        display: table;
        clear: both;
    }

    a {
        color: #5D6975;
        text-decoration: underline;
    }

    body {
        position: relative;
        width: 90%;
        height: 29.7cm;
        margin: 0 auto;
        padding: 0 5%;
        color: #001028;
        background: #FFFFFF;
        font-family: Arial, sans-serif;
        font-size: 12px;
        font-family: "Open Sans", sans-serif;
    }

    header {
        padding: 10px 0;
        margin-bottom: 30px;
    }

    #logo {
        text-align: center;
        margin-bottom: 10px;
    }

    #logo img {
        width: 90px;
    }

    h1 {
        border-top: 1px solid  #5D6975;
        border-bottom: 1px solid  #5D6975;
        color: #5D6975;
        font-size: 2.4em;
        line-height: 1.4em;
        font-weight: normal;
        text-align: center;
        margin: 0 0 20px 0;
        background: url(dimension.png);
    }

    #project {
        float: left;
    }

    #project span {
        color: #5D6975;
        text-align: right;
        width: 52px;
        margin-right: 10px;
        display: inline-block;
        font-size: 0.8em;
    }

    #company {
        float: right;
        text-align: right;
    }

    #project div,
    #company div {
        white-space: nowrap;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        margin-bottom: 20px;
    }

    table tr:nth-child(2n-1) td {
        background: #F5F5F5;
    }

    table th,
    table td {
        text-align: center;
    }

    table th {
        padding: 5px 20px;
        color: #5D6975;
        border-bottom: 1px solid #C1CED9;
        white-space: nowrap;
        font-weight: normal;
    }

    table .service,
    table .desc {
        text-align: left;
    }

    table td {
        padding: 20px;
        text-align: right;
    }

    table td.service,
    table td.desc {
        vertical-align: top;
    }

    table td.unit,
    table td.qty,
    table td.total {
        font-size: 1.2em;
    }

    table td.grand {
        border-top: 1px solid #5D6975;;
    }

    #notices .notice {
        color: #5D6975;
        font-size: 1.2em;
    }

    footer {
        color: #5D6975;
        width: 100%;
        height: 30px;
        position: absolute;
        bottom: 0;
        border-top: 1px solid #C1CED9;
        padding: 8px 0;
        text-align: center;
    }
</style>
<body>
<header class="clearfix">


    <div id="logo">
        <img src="logo.png">
    </div>
    <h1>DATE TODAY</h1>
    <div id="company" class="clearfix">
        <div>Dennis Adriaansen</div>
        <div>De Rosmolen 28<br /> 5386EK, Geffen</div>
        <div>06 836 755 96</div>
        <div><a href="mailto:adriaansendennis@gmail.com">adriaansendennis@gmail.com</a></div>
    </div>
    <div id="project">
        <div><span>PROJECT</span>{{$data['project']['title']}}</div>
        <div><span>CONTACTPERSOON</span> John Doe</div>
        <div><span>ADRES</span> {{$data['project']['client']['address']}}</div>
        <div><span>POSTCODE</span> {{$data['project']['client']['postal']}}</div>
        <div><span>E-MAIL</span> <a href="mailto:john@example.com">{{$data['project']['client']['email']}}</a></div>
        <div><span>DATUM</span> August 17, 2015</div>
    </div>
</header>
<main>
    <table>
        <thead>
        <tr>
            <th class="service">SERVICE</th>
            <th class="desc">DESCRIPTION</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>TOTAL</th>
        </tr>
        </thead>
        <tbody>

        @foreach ($data['todos'] as $todo)
            <tr>
                <td class="service">{{$todo['id']}}</td>
                <td class="desc">{{$todo['title']}}</td>
                <td class="unit">{{$todo['minutes'] / 60}}</td>
                <td class="total">$1,040.00</td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
    </div>
</main>
<footer>
    Invoice was created on a computer and is valid without the signature and seal.
</footer>
</body>
</html>