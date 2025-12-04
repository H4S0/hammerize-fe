import React from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { FieldError } from '../ui/field';

type InstantFieldErrorProps = {
  fieldState: ControllerFieldState;
};

const InstantFieldError = ({ fieldState }: InstantFieldErrorProps) => {
  return fieldState.invalid && <FieldError errors={[fieldState.error]} />;
};

export default InstantFieldError;
