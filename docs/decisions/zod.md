# ZOD поведения

## Parse object

Если у тебя некая схема:

```ts
const someSchema = z.object({
  data1: z.string()
})

```

то при передаче `parse(obj)` объекта с нужными параметрами то будет вернеть отфлиртованный объект.

Отфлиртованный объект значить что удалятся все лишные параметры которые не были заданы при создания схемы.

```ts

const someSchema = z.object({
  data1: z.string()
})

const obj1 = {
  data1: "value1",
  data2: "value2",
  data3: "value3",
}

console.log(someSchema.parse(obj1))
// {
//   data1: "value1",
// }

```
