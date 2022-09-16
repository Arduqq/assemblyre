<script>
export default {
    name: "FieldConfigInput",
    props: {
        title: String,
        binding: String,
        group: String,
        property: String,
        options: Array,
        val: String,
        alive: Boolean
    },
    data() {
        return {
            currentValue: this.val
        }
    },
    methods: {
        updateValue() {
            console.log('Set ' + this.property + ' to ' + this.currentValue + ' ' + this.group);
            this.$emit("change", {property: this.property, val: this.currentValue})
        }
    }
}
</script>
<style>
    


    .field-config-input {
        display: flex;
        padding: 10px;
        flex-flow: row wrap;
        width: 300px;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        background: var(--gui-color);
        z-index: 1;
    }

    .field-config-input img {
        height: 30px;
        width: 30px;
        flex: 0 0 30px;
    }

    .field-config-input .options {
        color: var(--secondary-color);
        padding: 5px;
        width: 100%;
        max-height: 200px;
        overflow-y: scroll;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-evenly;
    }

    .field-config-input h3 {
        align-self: flex-start;
        display: block;
        color: var(--secondary-color);
        padding: 2.5px;
        border-radius: 5px;
        user-select: none;
        transition: .05s;
    }

</style>