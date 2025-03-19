<script setup>
import { ref } from 'vue'

const value = ref([
    '客户1',
    '车间1-1',
    '产线1-1-1',
])

const props = {
    expandTrigger: 'hover',
}

const handleChange = (value) => {
    console.log(value)
}

const options = [
    {
        value: '客户1',
        label: '客户1',
        children: [
            {
                value: '车间1-1',
                label: '车间1-1',
                children: [
                    {
                        value: '产线1-1-1',
                        label: '产线1-1-1',
                    },
                    {
                        value: '产线1-1-2',
                        label: '产线1-1-2',
                    },
                    {
                        value: '产线1-1-3',
                        label: '产线1-1-3',
                    },
                    {
                        value: '产线1-1-4',
                        label: '产线1-1-4',
                    },
                ],
            },
            {
                value: '车间1-2',
                label: '车间1-2',
                children: [
                    {
                        value: '产线1-2-1',
                        label: '产线1-2-1',
                    },
                    {
                        value: '产线1-2-2',
                        label: '产线1-2-2',
                    },
                ],
            },
        ],
    },
    {
        value: '客户2',
        label: '客户2',
        children: [
            {
                value: '车间2-1',
                label: '车间2-1',
                children: [
                    {
                        value: '产线2-1-1',
                        label: '产线2-1-1',
                    },
                    {
                        value: '产线2-1-2',
                        label: '产线2-1-2',
                    },
                    {
                        value: '产线2-1-3',
                        label: '产线2-1-3',
                    },
                    {
                        value: '产线2-1-4',
                        label: '产线2-1-4',
                    },
                    {
                        value: '产线2-1-5',
                        label: '产线2-1-5',
                    },
                ],
            },
            {
                value: '车间2-2',
                label: '车间2-2',
                children: [
                    {
                        value: '产线2-2-1',
                        label: '产线2-2-1',
                    },
                    {
                        value: '产线2-2-2',
                        label: '产线2-2-2',
                    },
                    {
                        value: '产线2-2-3',
                        label: '产线2-2-3',
                    },
                    {
                        value: '产线2-2-4',
                        label: '产线2-2-4',
                    },
                    {
                        value: '产线2-2-5',
                        label: '产线2-2-5',
                    },
                    {
                        value: '产线2-2-6',
                        label: '产线2-2-6',
                    },
                    {
                        value: '产线2-2-7',
                        label: '产线2-2-7',
                    },
                    {
                        value: '产线2-2-8',
                        label: '产线2-2-8',
                    },
                    {
                        value: '产线2-2-9',
                        label: '产线2-2-9',
                    },
                    {
                        value: '产线2-2-10',
                        label: '产线2-2-10',
                    },
                    {
                        value: '产线2-2-11',
                        label: '产线2-2-11',
                    },
                    {
                        value: '产线2-2-12',
                        label: '产线2-2-12',
                    },
                    {
                        value: '产线2-2-13',
                        label: '产线2-2-13',
                    },
                    {
                        value: '产线2-2-14',
                        label: '产线2-2-14',
                    },
                ],
            },
            {
                value: '车间2-3',
                label: '车间2-3',
                children: [
                    {
                        value: '产线2-3-1',
                        label: '产线2-3-1',
                    },
                    {
                        value: '产线2-3-2',
                        label: '产线2-3-2',
                    },
                    {
                        value: '产线2-3-3',
                        label: '产线2-3-3',
                    },
                    {
                        value: '产线2-3-4',
                        label: '产线2-3-4',
                    },
                    {
                        value: '产线2-3-5',
                        label: '产线2-3-5',
                    },
                    {
                        value: '产线2-3-6',
                        label: '产线2-3-6',
                    },
                ],
            },
            {
                value: '车间2-4',
                label: '车间2-4',
                children: [
                    {
                        value: '产线2-4-1',
                        label: '产线2-4-1',
                    },
                    {
                        value: '产线2-4-2',
                        label: '产线2-4-2',
                    },
                    {
                        value: '产线2-4-3',
                        label: '产线2-4-3',
                    },
                    {
                        value: '产线2-4-4',
                        label: '产线2-4-4',
                    },
                    {
                        value: '产线2-4-5',
                        label: '产线2-4-5',
                    }
                ],
            },
            {
                value: '车间2-5',
                label: '车间2-5',
                children: [
                    {
                        value: '产线2-5-1',
                        label: '产线2-5-1',
                    },
                    {
                        value: '产线2-5-2',
                        label: '产线2-5-2',
                    },
                    {
                        value: '产线2-5-3',
                        label: '产线2-5-3',
                    },
                    {
                        value: '产线2-5-4',
                        label: '产线2-5-4',
                    },
                    {
                        value: '产线2-5-5',
                        label: '产线2-5-5',
                    },
                ],
            },
            {
                value: '车间2-6',
                label: '车间2-6',
                children: [
                    {
                        value: '产线2-6-1',
                        label: '产线2-6-1',
                    },
                    {
                        value: '产线2-6-2',
                        label: '产线2-6-2',
                    },
                    {
                        value: '产线2-6-3',
                        label: '产线2-6-3',
                    },
                    {
                        value: '产线2-6-4',
                        label: '产线2-6-4',
                    },
                    {
                        value: '产线2-6-5',
                        label: '产线2-6-5',
                    },
                    {
                        value: '产线2-6-6',
                        label: '产线2-6-6',
                    },
                ],
            },
        ],
    },
    {
        value: '客户3',
        label: '客户3',
        children: [
            {
                value: '车间3-1',
                label: '车间3-1',
            },
            {
                value: '车间3-2',
                label: '车间3-2',
            },
            {
                value: '车间3-3',
                label: '车间3-3',
            },
        ],
    },
]

const time = ref(new Date().toLocaleString())

const updateTime = () => {
    time.value = new Date().toLocaleString()
    requestAnimationFrame(updateTime)
}

updateTime()

</script>

<template>
    <div class="header">
        <div class="left">
            <img class="logo" src="@/assets/logo.svg" alt="">
            <el-cascader style="width: 500px;" v-model="value" :options="options" :props="props" @change="handleChange" />
            <el-button class="authorization" type="primary">授权</el-button>
        </div>
        <div class="right">
            <span>离线中...</span>
            <!-- 服务器时间：{{ time }} -->
        </div>

    </div>
</template>

<style scoped>
.header,
.left,
.right {
    height: 40px;
    display: flex;
    align-items: center;

}

.header {
    justify-content: space-between;
}

.logo {
    width: 30px;
    margin-right: 10px;
}
.authorization {
    margin-left: 10px;
}
</style>