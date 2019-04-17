<template>
  <div>
    <div v-if="data.type !== 'element'" class="node-end">
      <input v-model="data[data.type]" type="text" class="input-data">
    </div>
    <div v-else class="container" :class="['label-'+level]">
      <input v-model="data.name" type="text" class="container--label">
      <!-- Disable add and remove node buttons -->
      <!-- <button class="btn node-btn btn-minus" @click="removeNode(index)">-</button> -->
      <!-- <button class="btn node-btn btn-plus" @click="addNode(index)">+</button> -->

      <div v-for="(node, nodeIndex) in data.elements" :key="nodeIndex">
        <recursive-node :data="node" :level="level+1" :index="index + '-' +nodeIndex" @addNode="e => { addNode(e) }" @removeNode="e => { removeNode(e) }"/>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'RecursiveNode',
    props: ['data', 'level', 'index'],
    methods: {
      removeNode (index) {
        this.$emit('removeNode', index)
      },
      addNode (index) {
        this.$emit('addNode', index)
      }
    }
  }
</script>

<style scoped>
  .container {
    position: relative;
    border: 1px solid #a1cee2;
    padding: 20px 20px;
    margin: 34px 20px;
    border-radius: 4px;
  }

  .node-end {
    padding: 7px 15px 0 0;
  }

  .container--label {
    font-size: 12px;
    margin-top: -34px;
    padding: 5px 12px;
    display: inline-block;
/*  background-color: rgb(8, 160, 255); Original color */
    background-color: rgba(37, 116, 169, 1);
    position: absolute;
    border-radius: 6px;
    color: #ffffff;
    font-weight: bold;
    border: 0;
  }

  .container.label-0 { background-color: rgba(037, 116, 169, .15); }
  .container.label-1 { background-color: rgba(034, 167, 240, .15); }
  .container.label-2 { background-color: rgba(255, 255, 255, .15); }
  .container.label-3 { background-color: rgba(255, 255, 255, .15); }
  .container.label-4 { background-color: rgba(255, 255, 255, .15); }
  .container.label-5 { background-color: rgba(255, 255, 255, .15); }
  .container.label-6 { background-color: rgba(255, 255, 255, .15); }
  .container.label-7 { background-color: rgba(255, 255, 255, .15); }

  .label-0 .node-btn, .label-0 .container--label { background-color: rgba(37, 116, 169, 1); }
  .label-1 .node-btn, .label-1 .container--label { background-color: rgba(34, 167, 240, 1); }
  .label-2 .node-btn, .label-2 .container--label { background-color: rgba(65, 185, 240, 1); }
  .label-3 .node-btn, .label-3 .container--label { background-color: rgba(107, 185, 240, 1); }
  .label-4 .node-btn, .label-4 .container--label { background-color: rgba(127, 195, 240, 1); }
  .label-5 .node-btn, .label-5 .container--label { background-color: rgba(137, 215, 255, 1); }
  .label-6 .node-btn, .label-6 .container--label { background-color: rgb(156, 228, 255); }
  .label-7 .node-btn, .label-7 .container--label { background-color: rgb(191, 225, 255); }

  .input-data {
    padding: 8px 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #b2bcd8;
    width: 100%;
  }

  .node-btn {
    width: 20px;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: -10px;
    border: 0;
    color: #fff;
    border-radius: 3px;
    font-weight: bold;
    line-height: 12px;
    padding: 2px 6px 4px 6px;
    opacity: 1;
    transition: opacity ease 500ms;
    cursor: pointer;
  }

  .node-btn:hover {
    opacity: .85;
  }

  .btn-minus {
    right: 36px;
  }

</style>
