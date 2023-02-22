#### ref类型声明

```
//可以通过Ref这个接口指定类型
const testRef: Ref<number | string> = '蓝忘机';
//使用泛型覆盖默认的推导行为
const testRef = ref<number | string>('蓝忘机');
```

#### reactive类型声明

```
interface Book {
  name: string;
  price?: number;
}
const book: Book = reactive({
  name: '魔道祖师'
});
```

#### props类型声明

```
//不足之处，这种方式会失去定义props默认值的能力
interface Props {
  name: string;
  price?: number;
}
const props = defineProps<Props>();

//解决，可以使用withDefaults
const props = withDefaults(defineProps<Props>(), {
  name: '蓝忘机',
  price: 18
});

```

#### Computed类型声明

```
//定义返回类型
const getPrice = computed<number | boolean>(() => {
  return 123;
});
```

#### emit标注类型

```
const emit = defineEmits<{
  (e: 'change', id: number);
  (e: 'editInfo', info: object);
}>();

```

