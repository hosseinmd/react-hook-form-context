# React-hook-form-context

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
