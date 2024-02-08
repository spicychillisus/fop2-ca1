const template = document.createElement('template');

template.innerHTML = `
    <style>
        :host {
            display : block;
            color: white;
            border-style: dotted;
            font-family: Arial, Helvetica, sans-serif;
            background-color : black;
        }
        div {
            padding : 0px 30px;
        }
        h3 {
            font-size : 2rem;
        }
        h5 {
            font-size : 1rem;
        }
    </style>
    <div>
        <h3>Car Park Height</h3>
        <hr>
        <h5>Car Park Number: <span id='car_park_no'>Type of activity</span></h5>
        <h5>Address: <span id='address'>No. of Participant</span></h5>
        <h5>Gantry Height: <span id='gantry_height'>No. of Participant</span></h5>
    </div>
`;
// cpHeight means car Park Height
class cpHeight extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

    // define attributes you need
    static get observedAttributes() {
        return ['car_park_no', 'address', 'gantry_height'];
    }

    // link attributes to properties 
    get car_park_no() {
        return this.getAttribute('car_park_no');
    }
    set car_park_no(value) {
        this.setAttribute('car_park_no', value);
    }

    get address() {
        return this.getAttribute('address');
    }
    set address(value) {
        this.setAttribute('address', value);
    }

    get gantry_height() {
        return this.getAttribute('gantry_height');
    }
    set gantry_height(value) {
        this.setAttribute('gantry_height', value);
    }

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'car_park_no' :
                element = this.root.querySelector('#car_park_no');
                element.textContent = newValue;
            break; 
            case 'address' :
                element = this.root.querySelector('#address');
                element.textContent = newValue;
            break;
            case 'gantry_height' :
                element = this.root.querySelector('#gantry_height');
                element.textContent = newValue;
            break;        
        }
    }
}

window.customElements.define('car-park-height', cpHeight);