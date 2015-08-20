<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Participatory Budgeting Suggestion Receipt</title>
    <style>
        body
        {
            font-family: "Helvetica", "Arial", sans-serif;
        }
    </style>


</head>
<body>
<div align="center">
    <h2>Citizen Participatory Budgeting Suggestion Receipt</h2>
</div>
<div align="left">
    <img style="float: right" src='{{ $suggestion->logo }}' alt='my-image' width='120' height='120'>

    <h3>Receipt No.:  {{$suggestion->receipt_no}}</h3>
    <h4>Date of Submission: {{
        date('d-m-Y'); }} </h4>
</div>
<div align="left">
    <h4>Name of the citizen: {{$suggestion->citizen_name}} </h4>
    <h4>Address: {{$suggestion->citizen_address }} </h4>
    <h4>Zone: {{$suggestion->zone_name }} </h4>
    <h4>Division: {{$suggestion->division_name }} </h4>

</div>
<div>
    <table border="1">
        <tr>
            <th>
                Work Description
            </th>
            <th>
                Location
            </th>
            <th>
                Work Type
            </th>
            <th>
                Work Purpose
            </th>
        </tr>
        <tr>
            <td>
               {{ $suggestion->work_description }}
            </td>
            <td>
                {{ $suggestion->work_location }}
            </td>
            <td>
               {{  $suggestion->work_type }}
            </td>
            <td>
                {{ echo $suggestion->work_purpose }}
            </td>
        </tr>
    </table>
</div>
Notes:
<ol>
    <li>
        This application form received by the citizen through email is a receipt of the suggestion that is submitted online by the citizens.
    </li>
    <li>
        Citizens are requested to save the copy for their reference
    </li>
    <li>
        The Receipt No. given on the form is a unique code that applies to a single suggestion that is submitted online.
    </li>
</ol>

</body>
</html>