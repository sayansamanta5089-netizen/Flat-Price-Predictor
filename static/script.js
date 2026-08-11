const flatCount =
    document.getElementById("flatCount");

const flatDetailsSection =
    document.getElementById("flatDetailsSection");

const flatForms =
    document.getElementById("flatForms");

const predictButton =
    document.getElementById("predictButton");

const resultsSection =
    document.getElementById("resultsSection");

const resultsContainer =
    document.getElementById("resultsContainer");

const errorMessage =
    document.getElementById("errorMessage");

const historyContainer =
    document.getElementById("historyContainer");

const clearHistoryButton =
    document.getElementById("clearHistoryButton");

const newPredictionSection =
    document.getElementById("newPredictionSection");

const newPredictionButton =
    document.getElementById("newPredictionButton");


const directionNames = {
    1: "East",
    2: "West",
    3: "South",
    4: "North"
};


flatCount.addEventListener(
    "change",
    function () {

        const count =
            Number(this.value);

        flatForms.innerHTML = "";

        resultsContainer.innerHTML = "";

        resultsSection.classList.add(
            "hidden"
        );

        newPredictionSection.classList.add(
            "hidden"
        );

        hideError();


        if (!count) {

            flatDetailsSection.classList.add(
                "hidden"
            );

            return;
        }


        flatDetailsSection.classList.remove(
            "hidden"
        );


        for (
            let i = 1;
            i <= count;
            i++
        ) {

            createFlatForm(i);

        }


        flatDetailsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


function createFlatForm(number) {

    const card =
        document.createElement("div");


    card.className =
        "flat-card";


    card.innerHTML = `

        <div class="flat-header">

            <div class="flat-number">
                ${number}
            </div>

            <div>

                <h3>
                    Flat ${number}
                </h3>

                <p>
                    Enter the complete property details below.
                </p>

            </div>

        </div>


        <div class="property-grid">


            <div class="input-group">

                <label>
                    🏷️ Flat ID
                </label>

                <input
                    type="number"
                    class="flat-id"
                    placeholder="Example: 101"
                    min="1"
                    required
                >

                <small>
                    Enter the
                    <strong>flat number only</strong>,
                    such as 101, 204 or 1504.
                </small>

            </div>


            <div class="input-group">

                <label>
                    📐 Area
                </label>

                <input
                    type="number"
                    class="area"
                    placeholder="Example: 1450"
                    min="1"
                    required
                >

                <small>
                    Enter the
                    <strong>total flat area</strong>
                    in square feet.
                </small>

            </div>


            <div class="input-group">

                <label>
                    🧭 Facing Direction
                </label>

                <input
                    type="number"
                    class="facing"
                    placeholder="Enter 1, 2, 3 or 4"
                    min="1"
                    max="4"
                    required
                >

                <div class="direction-guide">

                    <span>
                        East = <b>1</b>
                    </span>

                    <span>
                        West = <b>2</b>
                    </span>

                    <span>
                        South = <b>3</b>
                    </span>

                    <span>
                        North = <b>4</b>
                    </span>

                </div>

                <small>
                    Enter the
                    <strong>direction number</strong>
                    shown above.
                </small>

            </div>


            <div class="input-group">

                <label>
                    🏙️ Floor Number
                </label>

                <input
                    type="number"
                    class="floor"
                    placeholder="Example: 7"
                    min="0"
                    required
                >

                <small>
                    Enter your
                    <strong>actual floor number</strong>.
                </small>

            </div>


            <div class="input-group">

                <label>
                    🚗 Car Parking
                </label>

                <input
                    type="number"
                    class="parking"
                    placeholder="Example: 160"
                    min="0"
                    required
                >

                <small>
                    Enter the
                    <strong>parking area</strong>
                    in square feet.
                </small>

            </div>


            <div class="input-group">

                <label>
                    🛏️ Bedrooms
                </label>

                <select
                    class="bedrooms"
                    required
                >

                    <option value="">
                        Select bedrooms
                    </option>

                    <option value="1">
                        1 Bedroom
                    </option>

                    <option value="2">
                        2 Bedrooms
                    </option>

                    <option value="3">
                        3 Bedrooms
                    </option>

                    <option value="4">
                        4 Bedrooms
                    </option>

                    <option value="5">
                        5 Bedrooms
                    </option>

                </select>

                <small>
                    Select the
                    <strong>number of bedrooms</strong>.
                </small>

            </div>


        </div>

    `;


    flatForms.appendChild(card);
}


predictButton.addEventListener(
    "click",
    async function () {

        hideError();


        const cards =
            document.querySelectorAll(
                ".flat-card"
            );


        if (cards.length === 0) {

            showError(
                "Please select the number of flats first."
            );

            return;
        }


        const flats = [];


        for (
            let i = 0;
            i < cards.length;
            i++
        ) {

            const card =
                cards[i];


            const flatId =
                card.querySelector(
                    ".flat-id"
                ).value.trim();


            const area =
                Number(
                    card.querySelector(
                        ".area"
                    ).value
                );


            const facing =
                Number(
                    card.querySelector(
                        ".facing"
                    ).value
                );


            const floor =
                Number(
                    card.querySelector(
                        ".floor"
                    ).value
                );


            const parking =
                Number(
                    card.querySelector(
                        ".parking"
                    ).value
                );


            const bedrooms =
                Number(
                    card.querySelector(
                        ".bedrooms"
                    ).value
                );


            if (!flatId) {

                showError(
                    `Please enter the Flat ID for Flat ${i + 1}.`
                );

                return;
            }


            if (!area || area <= 0) {

                showError(
                    `Please enter a valid area for Flat ${i + 1}.`
                );

                return;
            }


            if (
                ![1, 2, 3, 4].includes(facing)
            ) {

                showError(
                    `Please enter a direction number from 1 to 4 for Flat ${i + 1}.`
                );

                return;
            }


            if (
                Number.isNaN(floor)
                || floor < 0
            ) {

                showError(
                    `Please enter a valid floor for Flat ${i + 1}.`
                );

                return;
            }


            if (
                Number.isNaN(parking)
                || parking < 0
            ) {

                showError(
                    `Please enter a valid parking area for Flat ${i + 1}.`
                );

                return;
            }


            if (
                !bedrooms
                || bedrooms <= 0
            ) {

                showError(
                    `Please select bedrooms for Flat ${i + 1}.`
                );

                return;
            }


            flats.push({

                flat_id:
                    flatId,

                area:
                    area,

                facing:
                    facing,

                floor:
                    floor,

                parking:
                    parking,

                bedrooms:
                    bedrooms

            });

        }


        predictButton.disabled =
            true;


        predictButton.innerHTML =
            "⏳ Generating Prices...";


        try {

            const response =
                await fetch(
                    "/predict",
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({
                                flats: flats
                            })

                    }
                );


            const data =
                await response.json();


            if (
                !response.ok
                || !data.success
            ) {

                throw new Error(
                    data.error
                    || "Prediction failed."
                );
            }


            displayResults(
                data.results
            );


            await loadHistory();


        } catch (error) {

            console.error(
                "Prediction Error:",
                error
            );


            showError(
                "Backend Error: "
                + error.message
            );


        } finally {

            predictButton.disabled =
                false;


            predictButton.innerHTML =
                "<span>Calculate All Flat Prices</span><b>→</b>";

        }

    }
);


function displayResults(results) {

    resultsContainer.innerHTML = "";


    results.forEach(
        function (result) {

            const direction =
                directionNames[
                    result.facing
                ] || "Unknown";


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "result-card";


            card.innerHTML = `

                <div class="result-header">

                    <div>

                        <div class="result-label">
                            ✓ PREDICTION COMPLETE
                        </div>

                        <h3>
                            Flat ${result.flat_id}
                        </h3>

                    </div>

                    <div class="success-icon">
                        ✓
                    </div>

                </div>


                <div class="price-box">

                    <div class="price-label">
                        ESTIMATED PROPERTY VALUE
                    </div>

                    <div class="price">

                        <span>
                            ₹
                        </span>

                        <strong>
                            ${Number(
                                result.predicted_price
                            ).toFixed(2)}
                        </strong>

                        <small>
                            Lakhs
                        </small>

                    </div>

                </div>


                <div class="summary-title">
                    Property Summary
                </div>


                <div class="result-grid">


                    <div class="result-item">

                        <span>
                            📐 Area
                        </span>

                        <strong>
                            ${result.area} sq ft
                        </strong>

                    </div>


                    <div class="result-item">

                        <span>
                            🧭 Facing
                        </span>

                        <strong>
                            ${direction}
                        </strong>

                        <small>
                            Direction ${result.facing}
                        </small>

                    </div>


                    <div class="result-item">

                        <span>
                            🏙️ Floor
                        </span>

                        <strong>
                            ${result.floor}
                        </strong>

                    </div>


                    <div class="result-item">

                        <span>
                            🚗 Parking
                        </span>

                        <strong>
                            ${result.parking} sq ft
                        </strong>

                    </div>


                    <div class="result-item">

                        <span>
                            🛏️ Bedrooms
                        </span>

                        <strong>
                            ${result.bedrooms}
                        </strong>

                    </div>


                </div>


                <div class="result-message">

                    ✨

                    <span>

                        Price successfully generated using the
                        <strong>
                            Multiple Linear Regression
                        </strong>
                        model.

                    </span>

                </div>

            `;


            resultsContainer.appendChild(card);

        }
    );


    resultsSection.classList.remove(
        "hidden"
    );


    newPredictionSection.classList.remove(
        "hidden"
    );


    resultsSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


newPredictionButton.addEventListener(
    "click",
    function () {

        flatCount.value = "";

        flatForms.innerHTML = "";

        resultsContainer.innerHTML = "";

        flatDetailsSection.classList.add(
            "hidden"
        );

        resultsSection.classList.add(
            "hidden"
        );

        newPredictionSection.classList.add(
            "hidden"
        );

        hideError();


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


async function loadHistory() {

    try {

        const response =
            await fetch("/history");


        const data =
            await response.json();


        if (!data.success) {

            return;

        }


        displayHistory(
            data.history
        );


    } catch (error) {

        console.error(
            "History Error:",
            error
        );

    }

}


function displayHistory(history) {

    if (
        !history
        || history.length === 0
    ) {

        historyContainer.innerHTML = `

            <div class="empty-history">

                <div class="empty-icon">
                    📊
                </div>

                <h3>
                    No Predictions Yet
                </h3>

                <p>
                    Your generated property predictions
                    will appear here automatically.
                </p>

            </div>

        `;

        return;
    }


    let table = `

        <table class="history-table">

            <thead>

                <tr>

                    <th>Date</th>

                    <th>Flat ID</th>

                    <th>Area</th>

                    <th>Facing</th>

                    <th>Floor</th>

                    <th>Parking</th>

                    <th>Bedrooms</th>

                    <th>Predicted Price</th>

                    <th>Delete</th>

                </tr>

            </thead>

            <tbody>

    `;


    history.forEach(
        function (item) {

            const direction =
                directionNames[
                    Number(item.facing)
                ] || "Unknown";


            table += `

                <tr>

                    <td>
                        ${item.created_at}
                    </td>

                    <td>

                        <strong>
                            ${item.flat_id}
                        </strong>

                    </td>

                    <td>
                        ${item.area} sq ft
                    </td>

                    <td>

                        <strong>
                            ${direction}
                        </strong>

                        <small class="history-direction">
                            Direction ${item.facing}
                        </small>

                    </td>

                    <td>
                        ${item.floor}
                    </td>

                    <td>
                        ${item.parking} sq ft
                    </td>

                    <td>
                        ${item.bedrooms}
                    </td>

                    <td class="history-price">

                        ₹ ${Number(
                            item.predicted_price
                        ).toFixed(2)} L

                    </td>

                    <td>

                        <button
                            class="delete-button"
                            onclick="deleteHistory(${item.id})"
                        >
                            🗑
                        </button>

                    </td>

                </tr>

            `;

        }
    );


    table += `

            </tbody>

        </table>

    `;


    historyContainer.innerHTML =
        table;

}


async function deleteHistory(id) {

    if (
        !confirm(
            "Delete this prediction from history?"
        )
    ) {

        return;
    }


    try {

        const response =
            await fetch(
                `/history/${id}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (data.success) {

            await loadHistory();

        } else {

            alert(
                data.error
            );

        }

    } catch (error) {

        alert(
            "Unable to delete this prediction."
        );

    }

}


clearHistoryButton.addEventListener(
    "click",
    async function () {

        if (
            !confirm(
                "Are you sure you want to clear all prediction history?"
            )
        ) {

            return;
        }


        try {

            const response =
                await fetch(
                    "/history",
                    {
                        method: "DELETE"
                    }
                );


            const data =
                await response.json();


            if (data.success) {

                await loadHistory();

            } else {

                alert(
                    data.error
                );

            }

        } catch (error) {

            alert(
                "Unable to clear history."
            );

        }

    }
);


function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.classList.add(
        "show"
    );

    errorMessage.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


function hideError() {

    errorMessage.classList.remove(
        "show"
    );

    errorMessage.textContent =
        "";

}


loadHistory();