<script>
    import ins_time_eq from "$lib/assets/ins_time_eq.png";
    import calc_ins_time_eq_1 from "$lib/assets/calc_ins_time_eq_1.png";
    import calc_ins_time_eq_2 from "$lib/assets/calc_ins_time_eq_2.png";
    import globalCss from "$lib/global.css";

    function meanOfTwo(a, b) {
        return (a + b) / 2;
    }

    function setOutput(output) {
        document.getElementById("output").innerHTML = output;
    }

    function calcTimeSensConstant(u1, t1, u2, t2) {
        let j = -(Math.log(t1 / t2) / (Math.log(u1) - Math.log(u2)));
        return Math.round(j * 100) / 100;
    }

    function calcTimeConstant(u1, t1, u2, t2, timeSensConstant) {
        let k = meanOfTwo(t1, t2) * Math.pow(meanOfTwo(u1, u2), timeSensConstant);
        return Math.round(k * 100) / 100;
    }

    let u1;
    let u2;
    let t1;
    let t2;

    function runCalc() {
        let timeSensConst = calcTimeSensConstant(u1, t1, u2, t2);
        let timeConst = calcTimeConstant(u1, t1, u2, t2, timeSensConst);
        let outputMsg = "Insulin time constant: <b>" + timeConst.toString() + "</b><br>Insulin time sensitivity constant: <b>" + timeSensConst.toString() + "</b>";
        setOutput(outputMsg);
    }
</script>

<link rel="stylesheet" src="./lib/global.css">
<style>
    img {
        max-width: 200px;
    }
</style>

<div>
    <h1>How to calculate time constant and time sensitivity constant</h1>
    <h2>Automated calculator</h2>
        <b><i>I strongly recommend you read the below "How to calculate manually" section before proceeding!</i></b>
        <form> 
            <h3>Sample 1</h3>
            <label for="u1">Insulin (units)</label>
            <input type="number" name="u1" bind:value={u1}><br>

            <label for="t1">Time for insulin to take effect (minutes)</label>
            <input type="number" name="t1" bind:value={t1}><br>

            <h3>Sample 2</h3>
            <label for="u2">Insulin (units)</label>
            <input type="number" name="u2" bind:value={u2}><br>

            <label for="t2">Time for insulin to take effect (minutes)</label>
            <input type="number" name="t2" bind:value={t2}><br>

            <button on:click={runCalc}>Calculate</button><br>
        </form>
        <p id="output"></p>
    <h2>What is <i>actually</i> happening?</h2>
        <p>I essentially trial-and-errored my way to a half decent system to estimate how long it'll take for a given insulin dose to take effect.</p>
        <br>
        <p><b>Disclaimer: I am not a doctor! I am just some dude on the internet, so use this advice at your own peril!</b></p>
        <br>
        <p>So, the equation below is what I ended up with</p>
        <img src={ins_time_eq} alt="t = j / (i^k)">
        <p>
            Where:<br>
            <i>t</i> is time (minutes)<br>
            <i>j</i> is your insulin time constant (arbitrary)<br>
            <i>i</i> is the insulin administered (units, aka 0.01ml)<br>
            <i>k</i> is your insulin time sensitivity constant (arbitrary)
        </p>
        <br>
        <p>You can just substitute the relevent values in and get an alright-ish estimate. Better than the standard <i>"yeah just wait like 20 or so minutes"</i> you get from doctors in my opinion.</p>
    <h2>How to calculate manually</h2>
        <p>
            If you remember or are doing GCSE/A-level maths, it's basically an overcomplicated simultanious equation.<br>
            I say overcomplicated because logarithms get involved.<br>
            By the way, I usually round to 2 decimal places for the final results.<br>
            Below I refer to 'samples' - in this context, that just means your own data where you have a pretty good idea of:
        </p>
        <ul>
            <li>How long the insulin took to have an effect</li>
            <li>How much insulin you administered</li>
        </ul>
        <p>Here's the equation for the <u>time sensitivity constant</u>:</p>
        <img src={calc_ins_time_eq_1} alt="j = -(ln(t_1 / t_2) / (ln(u_1) - ln(u_2)))">
        <p>
            Where:<br>
            <i>j</i> is the insulin time sensitivity constant (arbitrary)<br>
            <i>t<sub>1</sub></i> is the <u>time</u> that insulin took to have an effect in the <u>first</u> sample (minutes)<br>
            <i>t<sub>2</sub></i> is the <u>time</u> that insulin took to have an effect in the <u>second</u> sample (minutes)<br>
            <i>u<sub>1</sub></i> is the <u>amount</u> of insulin administered in the <u>first</u> sample (units, aka 0.01ml)<br>
            <i>u<sub>2</sub></i> is the <u>amount</u> of insulin administered in the <u>second</u> sample (units, aka 0.01ml)<br>
        </p>
        <br>
        <p>And here's the second equation for the <u>time constant</u>:<br><i>Note that for <b>u</b> and <b>t</b>, you can use either set of results, or (like I did in the automated calculator) use a mean average of both.</i></p>
        <img src={calc_ins_time_eq_2} alt="">
        <p>
            Where:<br>
            <i>k</i> is the insulin time constant (arbitrary)<br>
            <i>j</i> is the insulin time sensitivity constant (arbitrary - the one we calculated just now)<br>
            <i>t</i> is the time that insulin took to have an effect (minutes)<br>
            <i>u</i> is the amount of insulin administered (units, aka 0.01ml)<br>
        </p>
</div>