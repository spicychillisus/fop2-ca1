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
        <h3>car park number based on characters</h3>
        <hr>
        <h5>Car Park Number: <span id='car_park_no'>Type of activity</span></h5>
        <h5>Address: <span id='address'>No. of Participant</span></h5>
    </div>
`;

class carParkCharacter extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);

        // Bind event listener for the button
        this.root.querySelector('#fetchDataButton').addEventListener('click', () => {
            const characters = this.root.querySelector('#characterInput').value;
            this.fetchDataAndUpdate(characters);
        });
    }

    // define attributes you need
    static get observedAttributes() {
        return ['car_park_no', 'address'];
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

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'car_park_no':
                element = this.root.querySelector('#car_park_no');
                element.textContent = newValue;
                break;
            case 'address':
                element = this.root.querySelector('#address');
                element.textContent = newValue;
                break;
        }
    }

    async fetchDataAndUpdate(characters) {
        try {
            const data = await filterByCharacters(characters);
            // Update attributes with fetched data
            this.car_park_no = data.car_park_no;
            this.address = data.address;
        } catch (error) {
            console.error(error);
        }
    }
}

window.customElements.define('car-park-character', carParkCharacter);
