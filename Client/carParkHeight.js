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
        <h3 id='address'>Car Park Height</h3>
        <hr>
        <h5>Type: <span id='car_park_no'>Type of activity</span></h5>
        <h5>Number of Participant(s): <span id='gantry_height'>No. of Participant</span></h5>
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
    get activity() {
        return this.getAttribute('car_park_no');
    }
    set activity(value) {
        this.setAttribute('car_park_no', value);
    }

    get activitytype() {
        return this.getAttribute('address');
    }
    set activitytype(value) {
        this.setAttribute('address', value);
    }

    get participant() {
        return this.getAttribute('gantry_height');
    }
    set participant(value) {
        this.setAttribute('gantry_height', value);
    }

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'activity' :
                element = this.root.querySelector('#activity');
                element.textContent = newValue;
            break; 
            case 'activitytype' :
                element = this.root.querySelector('#activityType');
                element.textContent = newValue;
            break;
            case 'participant' :
                element = this.root.querySelector('#participant');
                element.textContent = newValue;
            break;        
        }
    }
}

window.customElements.define('car-park-height', cpHeight);