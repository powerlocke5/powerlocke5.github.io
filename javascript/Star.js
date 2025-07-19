export class Star {
    constructor(_x, _y, _color="white") {
        this.x = this.getRandomInt(-_x / 2, _x / 2);
        this.y = this.getRandomInt(-_y / 2, _y / 2);
        
        this.px = [];
        this.py = [];
        this.px.push(this.x)
        this.py.push(this.y)

        this.size = 1.23;
        this.color = _color
    }

    setPreviousPosition() {
        this.px.push(this.x)
        this.py.push(this.y)
    }


    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    update(_x, _y) {
        
        let dividend = 32;

        if ((this.x < -_x / 2 || this.x > _x / 2) || (this.y < -_y / 2 || this.y > _y / 2)) {
            Object.assign(this, new Star(_x, _y));
        }
        else {
            this.setPreviousPosition();
            this.x += this.x / (dividend);
            this.y += this.y / (dividend);
            this.size += 0.023;
            
        }

        // Explosion of the star by size
        if (this.size > 23 && this.color == "white") {
            this.color = "yellow";
        } else if (this.size > 46 && this.color == "yellow") {
            this.color = "orange";
        } else if (this.size > 69 && this.color == "orange") {
            this.color = "red";
        } else if (this.size > 92 && this.color == "red") {
            this.y += 0.23;
            this.color = "white";
        }

        if (this.size > 23) {
            this.size *= 1.023
        }

    }

}