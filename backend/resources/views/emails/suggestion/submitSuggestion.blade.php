
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
Dear {{ $user->name }},<br><br>

Thank you for your suggestion <br>


<div align="center">
    <h2>Citizen Participatory Budgeting Suggestion Receipt</h2>
</div>
<div align="left">
    {{--    <img style="float: right" src='{{ $suggestion->logo }}' alt='my-image' width='120' height='120'>--}}

    <h3>Receipt No.:  {{$suggestion->id}}</h3>
    <h4>Date of Submission:  </h4>
</div>
<div align="left">
    <h4>Name of the citizen: {{$user->name}} </h4>
    <h4>Address: {{$user->address }} </h4>
    <h4>Zone: {{$suggestion->zone_id }} </h4>
    <h4>Division: {{$suggestion->division_id }} </h4>

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
                {{ $suggestion->suggestion }}
            </td>
            <td>
                {{ $suggestion->area }}
            </td>
            <td>
                {{  $suggestion->city_function_id }}
            </td>
            <td>
                {{--{{ echo $suggestion->work_purpose }}--}}
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
<br>
For any further queries/assistance, kindly mail us at abc@xyz.com <br><br>
Regards,<br>
Participatory Budgeting Team<br>
<hr>
</body>
</html>

