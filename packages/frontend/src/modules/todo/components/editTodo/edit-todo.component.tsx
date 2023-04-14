import React from 'react';
import { Box, Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../common/components/form/form.component';
import { ITodo } from '../../types/todo.type';
import { ITodoBody } from '../../types/todoBody.type';
import { todoService } from '../../services/todo.service';
import { APP_KEYS } from '../../../common/consts';
import { SPACES } from '../../../theme';
import { todoSchema } from '../../schemas/todo.schema';

type EditTodoProps = {
  handleClose: () => void;
  todo: ITodo;
};

type UpdateTodoType = {
  data: ITodoBody;
  todoId: string;
};

export const EditTodo = ({ handleClose, todo }: EditTodoProps) => {
  const { id, ...initialValues } = todo;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateTodoMutation } = useMutation({
    mutationFn: ({ data, todoId }: UpdateTodoType) => todoService.updateTodo(data, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    }
  });

  const formik = useFormik({
    initialValues: {
      name: initialValues.name,
      description: initialValues.description,
      isCompleted: initialValues.isCompleted,
      isPrivate: initialValues.isPrivate
    },
    validationSchema: todoSchema,
    onSubmit: (values, actions) => {
      updateTodoMutation({ data: { todo: values }, todoId: todo.id });
      actions.resetForm();
      navigate(APP_KEYS.ROUTER_KEYS.TODOS_LIST);
    }
  });

  return (
    <Form onSubmit={() => formik.handleSubmit()}>
      <TextField
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <TextField
        type="text"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              name="isCompleted"
              id="isCompleted"
              checked={formik.values.isCompleted}
              onChange={formik.handleChange}
            />
          }
          label="Completed"
        />
        <FormControlLabel
          control={
            <Switch
              name="isPrivate"
              id="isPrivate"
              checked={formik.values.isPrivate}
              onChange={formik.handleChange}
            />
          }
          label="Private"
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: SPACES.m }}>
          <Button type="button" onClick={handleClose}>
            Back
          </Button>
          <Button type="submit">Save</Button>
        </Box>
      </FormGroup>
    </Form>
  );
};
