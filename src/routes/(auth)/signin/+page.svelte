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

	const submitHandle: SubmitFunction = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Sign in successful');
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
	<div class="w-full max-w-sm">
		<Card.Root {...restProps}>
			<Card.Header>
				<Card.Title>Sign in to your account</Card.Title>
				<Card.Description>Enter your credentials to continue</Card.Description>
			</Card.Header>

			<Card.Content>
				<form method="post" use:enhance={submitHandle} class="space-y-4">
					
					<Field.Field>
						<Field.Label>Email or Username</Field.Label>
						<Input
							name="identifier"
							type="text"
							placeholder="email@example.com or johndoe"
							required
						/>
					</Field.Field>

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
					</Field.Field>

					<div class="pt-2">
						<Button type="submit" class="w-full">Sign In</Button>
						<p class="text-center text-sm mt-2 text-muted-foreground">
							Don't have an account?
							<a href="/signup" class="text-primary">Sign up</a>
						</p>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>
