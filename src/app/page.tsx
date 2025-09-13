"use client"
import { useForm } from "react-hook-form";
import { client } from "../server/client.orpc";

export default function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await client.todo.create(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title:
        <input type="text" {...register("title", { required: true })} />
        {errors.title && <span>This field is required</span>}
      </label>
      <label>
        Description:
        <input type="text" {...register("description", { required: true })} />
        {errors.description && <span>This field is required</span>}
      </label>
      <input type="submit" />
    </form>
  );
}
