import React from 'react';
import { TextField, FormGroup, FormControlLabel, Box, Button, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { useQueryClient, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { APP_KEYS } from '../../../common/consts';
import { SPACES } from '../../../theme';
import { todoService } from '../../services/todo.service';
import { ITodoBody } from '../../types/todo-body.type';
import { Form } from '../../../common/components/form/form.component';
import { todoSchema } from '../../schemas/todo.schema';

type AddTodoProps = {
  handleClose: () => void;
  handleOpenError: (msg: string) => void;
};

export const AddTodo = ({ handleOpenError, handleClose }: AddTodoProps) => {
  const queryClient = useQueryClient();

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: (data: ITodoBody) => todoService.addTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries([APP_KEYS.QUERY_KEYS.TODOS]);
    },
    onError: (err: AxiosError) => {
      handleOpenError(err.message);
    }
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      isCompleted: false,
      isPrivate: false
    },
    validationSchema: todoSchema,
    onSubmit: (values, actions) => {
      addTodoMutation({ todo: values });
      actions.resetForm();
      handleClose();
    }
  });

  return (
    <Form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <TextField
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        autoComplete="off"
      />
      <TextField
        type="text"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        autoComplete="off"
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
          <Button type="submit">Add</Button>
        </Box>
      </FormGroup>
    </Form>
  );
};
