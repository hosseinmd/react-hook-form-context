# React-hook-form-context
This is a wrapper of react-hook-form with some additional Benefits.
- use multiple form in your component without managing context of them.
- be type safe when use all of react-hook-form utils.


Create Context

```js
const FormContext = createFormContext({
  param: "",
});

function App() {
  return (
    <FormContext.Provider mode="submit" revalidateMode="onChange">
      ...rest
    </FormContext.Provider>
  );
}

//In your Component
const { param } = FormContext.useWatch();

<FormContext.Controller
  name="param"
  render={({field})=><input {...field}>}
/>
```
