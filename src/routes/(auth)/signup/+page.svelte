<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { Eye, EyeOff } from 'lucide-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ComponentProps } from 'svelte';

	let { ...restProps }: ComponentProps<typeof Card.Root> = $props();

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	const submitHandle: SubmitFunction = ({ formElement, formData }) => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Sign up successful...');
					await update();
					break;
				case 'failure':
					toast.error(result.data?.message);
					break;
				case 'error':
					toast.error('An unexpected error occurred');
					break;
			}
		};
	};
</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
	<div class="w-full max-w-sm md:max-w-md">
		<Card.Root {...restProps}>
			<Card.Header>
				<Card.Title>Create an account</Card.Title>
				<Card.Description>Enter your information below to create your account</Card.Description>
			</Card.Header>

			<Card.Content>
				<form method="post" use:enhance={submitHandle} class="space-y-4">
					<Field.Field>
						<Field.Label>Full Name</Field.Label>
						<Input name="name" type="text" placeholder="John Doe" required />
					</Field.Field>

                    
					<Field.Field>
                        <Field.Label>Username</Field.Label>
						<Input name="username" placeholder="JohnDoe" required />
					</Field.Field>
                    
                    <Field.Field>
                        <Field.Label>Email</Field.Label>
                        <Input name="email" type="email" placeholder="m@example.com" required />
                        <Field.Description>
                            We'll use this to contact you. We will not share your email with anyone else.
                        </Field.Description>
                    </Field.Field>
                    
					<!-- Password dan Confirm Password berdampingan -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Field.Field>
							<Field.Label>Password</Field.Label>
							<div class="relative">
								<Input
									name="password"
									type={showPassword ? 'text' : 'password'}
									required
									class="pr-10"
								/>
								<button
									type="button"
									class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
									onclick={() => (showPassword = !showPassword)}
								>
									{#if showPassword}
										<EyeOff size={20} />
									{:else}
										<Eye size={20} />
									{/if}
								</button>
							</div>
							<Field.Description>Must be at least 8 characters long.</Field.Description>
						</Field.Field>

						<Field.Field>
							<Field.Label>Confirm Password</Field.Label>
							<div class="relative">
								<Input
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									required
									class="pr-10"
								/>
								<button
									type="button"
									class="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground"
									onclick={() => (showConfirmPassword = !showConfirmPassword)}
								>
									{#if showConfirmPassword}
										<EyeOff size={20} />
									{:else}
										<Eye size={20} />
									{/if}
								</button>
							</div>
							<Field.Description>Please confirm your password.</Field.Description>
						</Field.Field>
					</div>

					<div class="pt-2">
						<Button type="submit" class="w-full">Create Account</Button>
						<p class="text-center text-sm mt-2 text-muted-foreground">
							Already have an account? <a href="/signin" class="text-primary">Sign in</a>
						</p>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
