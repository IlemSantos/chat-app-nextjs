import { useContext } from "react"
import { Button, Center, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, useToast } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContext"

export default function SignIn() {
  const { signIn } = useContext(AuthContext)
  const { handleSubmit, register, formState: { errors } } = useForm()
  const toast = useToast()

  async function handleSignIn(data) {
    const res = await signIn({
      email: data.email,
      password: data.password
    });

    if (res.error) {
      toast({
        title: `${res.error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12} rounded={6}>
          <Heading mb={6}>Log in</Heading>

          <form onSubmit={handleSubmit(handleSignIn)}>

            <FormControl isInvalid={errors.email} mb={2}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input {...register('email', {
                required: 'This is required',
              })} id="email" name="email" type="email" />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} mb={2}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input {...register('password', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })} id="password" name="password" type="password" />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Link href={"#"}><a><Text fontSize="sm">Forgot your password?</Text></a></Link>
            <Button width="100%" mt={4} borderRadius={"100vh"} colorScheme="teal" type="submit">Sign in</Button>
          </form>

          <Divider my={4} />

          <Center>Don't have an account?</Center>
          <Link href={"/auth/signup"}>
            <Button width="100%" mt={4} borderRadius={"100vh"} colorScheme="teal" variant='outline'>Sign up</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  )
}
