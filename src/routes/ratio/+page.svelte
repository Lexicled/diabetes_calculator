<script>
    import carb_ratio from "$lib/assets/carb_ratio.png"
    import insulin_sensitivity from "$lib/assets/insulin_sensitivity.png"
</script>

<style>
    img {
        max-width: 200px;
    }
</style>

<h1>Carb Ratio</h1>
<p>Just use any calculator (probably the one on your phone) to do:<br><i>It may be easier to do this in two steps.</i></p>
<img src={carb_ratio} alt="c = g / (u + m / s)">
<p>
    Where:<br>
    <i>c</i> is your carb ratio (g/U)<br>
    <i>g</i> is the carbs consumed (grams)<br>
    <i>u</i> is the bolus insulin you administered (units, aka 0.01ml)<br>
    <i>m</i> is the change (positive or negative) in blood glucose as a result of the bolus (mmol/L)<br>
    <i>s</i> is your insulin sensitivity (mmol/U)
</p>

<h1>Insulin Sensitivity</h1>
<p>Process is about the same as before, but (ideally) you wanna work this one out without any food or bolus.</p>
<img src={insulin_sensitivity} alt="s = -(m / u)">
<p>
    Where:<br>
    <i>s</i> is your insulin sensitivity (mmol/U)
    <i>u</i> is the adjustment insulin you administered (units, aka 0.01ml)<br>
    <i>m</i> is the change (if this isn't negative, you're doing something wrong) in blood glucose as a result of the bolus (mmol/L)<br>
</p>