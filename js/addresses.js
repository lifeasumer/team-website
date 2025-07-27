function showBillingForm() {
    document.getElementById('billing-display').style.display = 'none';
    document.getElementById('billing-form').style.display = 'block';
    document.getElementById('billing-cancel').style.display = 'inline-block';
}

function showShippingForm() {
    document.getElementById('shipping-display').style.display = 'none';
    document.getElementById('shipping-form').style.display = 'block';
    document.getElementById('shipping-cancel').style.display = 'inline-block';
}

function hideBillingForm() {
    document.getElementById('billing-form').style.display = 'none';
    document.getElementById('billing-display').style.display = 'block';
    document.getElementById('billing-cancel').style.display = 'none';
}

function hideShippingForm() {
    document.getElementById('shipping-form').style.display = 'none';
    document.getElementById('shipping-display').style.display = 'block';
    document.getElementById('shipping-cancel').style.display = 'none';
}

function saveBilling(event) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    const labels = ["Name", "Country", "City", "Address", "Street", "State", "Zip", "Email"];

    let data = {};
    inputs.forEach((input, index) => {
        data[labels[index]] = input.value;
    });

    localStorage.setItem('billingAddress', JSON.stringify(data));

    let formatted = Object.entries(data)
        .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
        .join('<br>');

    document.getElementById('billing-display').innerHTML = `
        <address style="color: black;">${formatted}</address>
        <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04" onclick="showBillingForm()">Edit</button>
    `;

    hideBillingForm();
}

function saveShipping(event) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input');
    const labels = ["Name", "Country", "City", "Address", "Street", "State", "Zip", "Email"];

    let data = {};
    inputs.forEach((input, index) => {
        data[labels[index]] = input.value;
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data));

    let formatted = Object.entries(data)
        .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
        .join('<br>');

    document.getElementById('shipping-display').innerHTML = `
        <address style="color: black;">${formatted}</address>
        <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04" onclick="showShippingForm()">Edit</button>
    `;

    hideShippingForm();
}

window.addEventListener('DOMContentLoaded', () => {
    const billingRaw = localStorage.getItem('billingAddress');
    const shippingRaw = localStorage.getItem('shippingAddress');

    if (billingRaw) {
        const billing = JSON.parse(billingRaw);
        let formatted = Object.entries(billing)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join('<br>');

        document.getElementById('billing-display').innerHTML = `
            <address style="color: black;">${formatted}</address>
            <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04" onclick="showBillingForm()">Modify</button>
        `;
    }

    if (shippingRaw) {
        const shipping = JSON.parse(shippingRaw);
        let formatted = Object.entries(shipping)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join('<br>');

        document.getElementById('shipping-display').innerHTML = `
            <address style="color: black;">${formatted}</address>
            <button class="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04" onclick="showShippingForm()">Modify</button>
        `;
    }
});
