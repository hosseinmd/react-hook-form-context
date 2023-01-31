# React-hook-form-context
This is a wrapper on react-hook-form with some additional Benefits.
- Use multiple form in your component without need to managing context of them.
- Be type safe when use all of react-hook-form utils.


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
