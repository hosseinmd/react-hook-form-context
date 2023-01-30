import React from "react";
import { createContext, ReactNode, useContext } from "react";
import {
  FieldArrayPath,
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
  UseFormReturn,
  useFormState,
  useWatch,
  Controller,
  ControllerProps,
  FieldPath,
  UseFormProps,
} from "react-hook-form";

function createFormContext<TFieldValues extends FieldValues>(
  initialState: TFieldValues
) {
  const Context = createContext<UseFormReturn<TFieldValues, object>>(
    undefined as any
  );

  const result = {
    Provider: ({
      children,
      defaultValues,
      ...formProps
    }: {
      children: ReactNode;
    } & UseFormProps<TFieldValues>) => {
      const methods = useForm<TFieldValues>({
        ...formProps,
        defaultValues: { ...initialState, ...defaultValues } as any,
      });

      return (
        <Context.Provider value={methods}>
          <FormProvider {...methods}>{children}</FormProvider>
        </Context.Provider>
      );
    },

    context: Context,

    useWatch: () => {
      const { control } = useContext(Context);
      const state = useWatch({ control }) as TFieldValues;
      return state;
    },

    useFormContext: () => {
      const context = useContext(Context);
      return context;
    },

    useFormState: () => {
      const { control } = useContext(Context);
      const state = useFormState({ control });
      return state;
    },

    useFieldArray: <
      TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
      TKeyName extends string = "id"
    >({
      name,
      keyName,
      shouldUnregister,
    }: {
      name: TFieldArrayName;
      keyName?: TKeyName;
      shouldUnregister?: boolean;
    }) => {
      const { control } = useContext(Context);
      const state = useFieldArray({ control, name, keyName, shouldUnregister });
      return state;
    },
    Controller: <
      TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    >({
      name,
      ...rest
    }: Omit<ControllerProps<TFieldValues, TName>, "control">) => {
      const { control } = useContext(Context);
      return <Controller {...rest} control={control} name={name} />;
    },
  };

  return result;
}

export { createFormContext };
