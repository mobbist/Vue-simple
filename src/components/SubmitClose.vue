<template>
    <div class="submitBox">
        <p>提示：仅支持jpg、jpeg、png、gif格式的图片，图片大小限50kb。</p>
        <div class="line">
            <div @click="close" class="left">取消</div>
            <div @click="submit" class="right">保存</div>
        </div>
    </div>
</template>
<script>
export default {

    methods: {
        close() {
            this.$store.commit({ type: "close" });
        },
        submit() {
            this.$store.commit({ type: "submit" });

        }
    }
}
</script>
<style>

</style>

