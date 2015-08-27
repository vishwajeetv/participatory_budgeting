
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
Dear {{ $suggestion->name }},<br><br>

Thank you for your suggestion <br>


<div align="center">
    <h2>Citizen Participatory Budgeting Suggestion Receipt</h2>
</div>
<div align="left">
   <h3>Receipt No.:  {{$suggestion->id}}</h3>
    <h4>Date of Submission:  {{$suggestion->updated_at}}</h4>
</div>
<div align="left">
    <h4>Name of the citizen: {{ $suggestion->name}} </h4>
    <h4>Address: {{$suggestion->address }} </h4>
    <h4>Zone: {{$zone->name }} </h4>
    <h4>Division: {{$zone->division_name }} </h4>

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
                {{  $city_function->function }}
            </td>
            <td>
                {{  $suggestion->work_purpose }}
            </td>
        </tr>
    </table>
</div>
<br>
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

