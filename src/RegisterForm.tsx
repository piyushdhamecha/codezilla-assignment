import { useForm } from "react-hook-form";
// import { Select } from "chakra-react-select";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Heading,
  Box,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { COUNTRIES_DROPDOWN_OPTIONS } from "./constants";
import React, { useState } from "react";

interface FormValueProps {
  firstName: string;
  lastName: string;
  phone: number;
  country: string;
}

interface RegisterFormProps {
  saveData?: (values: FormValueProps) => void;
}

const RegisterForm = ({ saveData }: RegisterFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValueProps>();
  const [formValues, setFormValues] = useState<FormValueProps>();
  const toast = useToast();

  const handleSubmitForm: SubmitHandler<FormValueProps> = (values) => {
    setFormValues(values);
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    saveData?.(values);
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        data-testid="registerForm"
      >
        <Heading mb={10} textAlign="center">
          Register
        </Heading>
        <VStack spacing={5}>
          <FormControl
            isInvalid={!!errors.firstName}
            data-testid="firstNameGroup"
          >
            <FormLabel htmlFor="firstName">First name</FormLabel>
            <Input
              id="firstName"
              placeholder="First name"
              {...register("firstName", {
                required: "This is required",
                minLength: {
                  value: 5,
                  message: "Minimum length should be 5",
                },
              })}
              data-testid="firstName"
            />
            <FormErrorMessage id="firstNameError">
              {errors.firstName && errors.firstName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <FormLabel htmlFor="lastName">Last name</FormLabel>
            <Input
              id="lastName"
              placeholder="Last name"
              {...register("lastName", {
                required: "This is required",
                minLength: {
                  value: 5,
                  message: "Minimum length should be 5",
                },
              })}
              data-testid="lastName"
            />
            <FormErrorMessage data-testid="lastNameError">
              {errors.lastName && errors.lastName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <Input
              id="phone"
              type="number"
              placeholder="Phone"
              {...register("phone", {
                required: "This is required",
              })}
              data-testid="phone"
            />
            <FormErrorMessage data-testid="phoneError">
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.country}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Select
              id="country"
              placeholder="Country"
              {...register("country", {
                required: "This is required",
              })}
              data-testid="country"
            >
              {COUNTRIES_DROPDOWN_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <FormErrorMessage data-testid="countryError">
              {errors.country && errors.country.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Box textAlign="end">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            data-testid="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
      {formValues && (
        <pre data-testid="result">{JSON.stringify(formValues, null, 2)}</pre>
      )}
    </React.Fragment>
  );
};

export default RegisterForm;
