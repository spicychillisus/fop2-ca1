const template = document.createElement('template');

template.innerHTML = `
    <style>
        :host {
            display : block;
            border-style: dotted;
            font-family: Arial, Helvetica, sans-serif;
            background-color : red;
            color: white;
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
        <h3 id='activity'>ACTIVITY GOES HERE</h3>
        <hr>
        <h5>Type: <span id='activityType'>Type of activity</span></h5>
        <h5>Number of Participant(s): <span id='participant'>No. of Participant</span></h5>
    </div>
`;

class carParkCharacter extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

    // define attributes you need
    static get observedAttributes() {
        return ['activity', 'activitytype', 'participant'];
    }

    // link attributes to properties 
    get activity() {
        return this.getAttribute('activity');
    }
    set activity(value) {
        this.setAttribute('activity', value);
    }

    get activitytype() {
        return this.getAttribute('activitytype');
    }
    set activitytype(value) {
        this.setAttribute('activitytype', value);
    }

    get participant() {
        return this.getAttribute('participant');
    }
    set participant(value) {
        this.setAttribute('participant', value);
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

window.customElements.define('car-park-character', carParkCharacter);