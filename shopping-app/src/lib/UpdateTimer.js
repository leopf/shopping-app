export default function UpdateTimer(dur, onUpdate)
{
    this.dur = dur;
    this.timeoutId = 0;
    this.changed = true;
    this.onUpdate = onUpdate;
}

UpdateTimer.prototype.setChanged = function() {
    if (this.changed)
    {
        clearTimeout(this.timeoutId);
    }
    else
    {
        this.changed = true;
    }

    this.timeoutId = setTimeout(this.onUpdate, this.dur);
}