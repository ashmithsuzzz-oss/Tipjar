// ===============================
// CONFIG
// ===============================
const ADDRESS = "MxG086HDR94WWW3ZJE24E807D5SQ7F5WUDQFNN9N221P89D698ZET9YK8832YJQ";

let status;


// ===============================
// WALLET EXTRACT (your method)
// ===============================
function getWalletAddress(res) {
    if (!res || !res.status) return null;

    const d = res.data;

    if (typeof d === "string") return d;
    if (typeof d === "object") return d.address || d.data;

    return null;
}


// ===============================
// INIT
// ===============================
window.onload = function () {

    status = document.getElementById("status");

    if (typeof MINIMASK !== "undefined") {

        MINIMASK.init(function (msg) {

            console.log("MiniMask:", msg);

            if (msg.event === "MINIMASK_INIT") {

                if (!msg.data || !msg.data.data || !msg.data.data.loggedon) {
                    status.innerText = "❌ Not logged in";
                    return;
                }

                status.innerText = "✅ Connected";
            }
        });

    } else {
        status.innerText = "❌ MiniMask not found";
    }
};


// ===============================
// SEND TIP
// ===============================
function sendTip(amount) {

    MINIMASK.account.getAddress(function (res) {

        const wallet = getWalletAddress(res);

        if (!wallet) {
            alert("Wallet error");
            return;
        }

        // optional message
        const state = {};
        state[0] = "tip";

        console.log("Sending tip:", amount);

        MINIMASK.account.send(
            amount,
            ADDRESS,
            "0x00",
            state,
            function (resp) {

                console.log("Response:", resp);

                if (resp.pending) {
                    status.innerText = "⏳ Approve in MiniMask...";
                } else {
                    status.innerText = "❌ Error sending tip";
                }
            }
        );
    });
}
