export default class Dimension {

    constructor(readonly height: number, readonly width: number, readonly depth: number) { }

    getVolume(): number {
        return ((this.height/100) * (this.width/100) * (this.depth/100));
    }
}