# React-hook-form-context

Create Context

```js
const FormContext = createFormContext({
  param: "",
});

//In your Component
const { param } = FormContext.useWatch();
```
