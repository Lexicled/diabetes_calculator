<script>
    import { onMount } from 'svelte';

    function setCookie(cname, cvalue) {
        console.log(cvalue)
        document.cookie = cname + "=" + cvalue + ";";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    let carbRatio;
    let sensitivity;
    let insTime;
    let carbTime;
    let target;

    let bg;
    let carbs;

    let output;

    function setOutput(output) {
        document.getElementById("output").innerHTML = output;
    }

    function loadCookies() {
        carbRatio = parseFloat(getCookie("carbRatio"));
        sensitivity = parseFloat(getCookie("sensitivity"));
        insTime = parseFloat(getCookie("insTime"));
        carbTime = parseFloat(getCookie("carbTime"));
        target = parseFloat(getCookie("target"));
    }

    function saveCookies() {
        setCookie("carbRatio", carbRatio.toString());
        setCookie("sensitivity", sensitivity.toString());
        setCookie("insTime", insTime.toString());
        setCookie("carbTime", carbTime.toString());
        setCookie("target", target.toString());
    }

    function generateOutput() {
        let adjustmentUnits = (bg - target) / sensitivity;
        let bolusUnits = carbs / carbRatio;
        let totalUnits = adjustmentUnits + bolusUnits;

        let insTimeVar = insTime / totalUnits;
        let timeBeforeMeal = insTimeVar - carbTime;

        let outputStr = "";
        outputStr += "Administer " + totalUnits.toFixed(1).toString() + "u insulin " + timeBeforeMeal.toFixed(1).toString() + "min before meal<br><br>";

        outputStr += "Bolus: " + bolusUnits.toFixed(1).toString() + "u<br>";
        outputStr += "Adjustment: " + adjustmentUnits.toFixed(1).toString() + "u<br><br>";

        outputStr += "Insulin time: " + insTimeVar.toFixed(1).toString() + "min<br>";

        setOutput(outputStr);
    }

    onMount(() => {
        loadCookies();
    });
</script>

<div>
    <h1>Diabetes Calculator</h1>

    <h2>Constants</h2>
    <form>
        <label for="carbRatio">Carb ratio (g/U)</label>
        <input type="" name="carbRatio" bind:value={carbRatio}><br>

        <label for="sensitivity">Insulin sensitivity (mmol/U)</label>
        <input type="number" name="sensitivity" bind:value={sensitivity}><br>

        <label for="insTime">Insulin time constant (U * mins)</label>
        <input type="number" name="insTime" bind:value={insTime}><br>

        <label for="carbTime">Carb time (mins)</label>
        <input type="number" name="carbTime" bind:value={carbTime}><br>

        <label for="target">Target BG (mmol/L)</label>
        <input type="number" name="target" bind:value={target}><br>

        <button on:click={saveCookies}>Save</button><br>
    </form>
    <hr>

    <h2>Variables</h2>
    <form>
        <label for="bg">Current BG (mmol/L)</label>
        <input type="number" name="bg" bind:value={bg}><br>

        <label for="carbs">Carbs (g)</label>
        <input type="number" name="carbs" bind:value={carbs}><br>

        <button on:click={generateOutput}>Calculate</button><br>
    </form>
    <hr>

    <h2>Output</h2>
    <p id="output"></p>
</div>