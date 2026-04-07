<script>
    import carb_ratio from "$lib/assets/carb_ratio.png";
    import insulin_sensitivity from "$lib/assets/insulin_sensitivity.png";

    function setOutput(output) {
        document.getElementById("output").innerHTML = output;
    }

    function calcRatio(g1, g2, i1, i2) {
        return Math.E ** ((Math.log(g1) * Math.log(i2) - Math.log(g2) * Math.log(i1)) / (Math.log(g2) - Math.log(g1)));
    }

    function calcInsulinMod(g1, g2, i1, i2, r) {
        let imod1 = Math.log(i1 * r) / Math.log(g1);
        let imod2 = Math.log(i2 * r) / Math.log(g2);
        return (imod1 + imod2) / 2;
    }

    let g1;
    let g2;
    let i1;
    let i2;

    function runCalc() {
        let ratio = calcRatio(g1, g2, i1, i2);
        let insMod = calcInsulinMod(g1, g2, i1, i2, ratio);
        let outputMsg = "Ratio: <b>" + (Math.round(ratio * 100) / 100).toString() + "g/U</b><br>Insulin Modifier: <b>" + (Math.round(insMod * 100) / 100).toString() + "</b>";
        setOutput(outputMsg);
    }
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

<h1>Using a Power for the Carbs</h1>
<p>Explanation coming soon. I wouldn't recommend screwing around with this unless the site owner (Alex) has showed you how it works!</p>
<h2>Automated calculator</h2>
    <b><i>Remember to use your sensitivity constant to offset any BG change by changing units in these samples!</i></b>
    <form> 
        <h3>Sample 1</h3>
        <label for="i1">Insulin (units)</label>
        <input type="number" name="i1" bind:value={i1}><br>

        <label for="g1">Carbs (grams)</label>
        <input type="number" name="g1" bind:value={g1}><br>

        <h3>Sample 2</h3>
        <label for="i2">Insulin (units)</label>
        <input type="number" name="i2" bind:value={i2}><br>

        <label for="g2">Carbs (grams)</label>
        <input type="number" name="g2" bind:value={g2}><br>

        <button on:click={runCalc}>Calculate</button><br>
    </form>
    <p id="output"></p>

<h1>Insulin Sensitivity</h1>
<p>Process is about the same as before, but (ideally) you wanna work this one out without any food or bolus.</p>
<img src={insulin_sensitivity} alt="s = -(m / u)">
<p>
    Where:<br>
    <i>s</i> is your insulin sensitivity (mmol/U)
    <i>u</i> is the adjustment insulin you administered (units, aka 0.01ml)<br>
    <i>m</i> is the change (if this isn't negative, you're doing something wrong) in blood glucose as a result of the bolus (mmol/L)<br>
</p>