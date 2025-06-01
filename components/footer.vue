<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="bg-gray-50 border-t border-neutral-200">
		<div class="px-4 py-12 mx-auto w-full max-w-[1400px] max-md:max-w-none">
			<div class="grid gap-8 md:grid-cols-4">
				<div>
					<NuxtLink
						to="/"
						class="flex gap-2 items-center mb-4 cursor-pointer"
					>
						<img src="/logo.webp" alt="logo" height="50" width="50">
						<span class="text-xl font-bold leading-7 cursor-pointer">Advisor Tribe</span>
					</NuxtLink>
					<p
						class="mb-4 max-w-xs text-gray-600 decoration-gray-600 outline-gray-600"
					>
						Build your personal board of advisors to navigate life's challenges
						and opportunities with expert guidance.
					</p>
					<div class="flex">
						<NuxtLink
							aria-label="Twitter"
							to="#"
							class="text-gray-500 cursor-pointer decoration-gray-500 outline-gray-500"
						>
							<Icon name="lucide:twitter" class="w-6 h-6" aria-hidden="true" />
						</NuxtLink>
						<NuxtLink
							aria-label="LinkedIn"
							to="#"
							class="ml-4 text-gray-500 cursor-pointer decoration-gray-500 outline-gray-500"
						>
							<Icon name="lucide:linkedin" class="w-6 h-6" aria-hidden="true" />
						</NuxtLink>
						<NuxtLink
							aria-label="Instagram"
							to="#"
							class="ml-4 text-gray-500 cursor-pointer decoration-gray-500 outline-gray-500"
						>
							<Icon
								name="lucide:instagram"
								class="w-6 h-6"
								aria-hidden="true"
							/>
						</NuxtLink>
					</div>
				</div>

				<div>
					<h3
						class="mb-3 font-semibold text-gray-900 decoration-gray-900 outline-gray-900"
					>
						For Users
					</h3>
					<ul>
						<li class="list-item text-left">
							<NuxtLink
								to="/browse"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Browse Advisors
							</NuxtLink>
						</li>
						<li class="list-item mt-2 text-left">
							<NuxtLink
								to="/dashboard"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Manage my Tribe
							</NuxtLink>
						</li>
						<li class="list-item mt-2 text-left">
							<NuxtLink
								to="#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Pricing
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div>
					<h3
						class="mb-3 font-semibold text-gray-900 decoration-gray-900 outline-gray-900"
					>
						For Advisors
					</h3>
					<ul>
						<li class="list-item text-left">
							<NuxtLink
								to="#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Join as Advisor
							</NuxtLink>
						</li>
						<li class="list-item mt-2 text-left">
							<NuxtLink
								to="#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Resources
							</NuxtLink>
						</li>
						<li class="list-item mt-2 text-left">
							<NuxtLink
								to="#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								FAQs
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div>
					<h3
						class="mb-3 font-semibold text-gray-900 decoration-gray-900 outline-gray-900"
					>
						Company
					</h3>
					<ul>
						<li class="list-item text-left">
							<NuxtLink
								to="/#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								About Us
							</NuxtLink>
						</li>
						<li class="list-item mt-2 text-left">
							<NuxtLink
								to="/#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Contact
							</NuxtLink>
						</li>
						<li class="list-item mt-2 text-left">
							<NuxtLink
								to="/#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Privacy Policy
							</NuxtLink>
						</li>
						<li class="list-item mt-2 text-left">
							<NuxtLink
								to="/#"
								class="text-left text-gray-600 cursor-pointer decoration-gray-600 outline-gray-600"
							>
								Terms of Service
							</NuxtLink>
						</li>
					</ul>
				</div>
			</div>

			<div class="pt-8 mt-12 border-t border-solid border-neutral-300">
				<p
					class="text-sm leading-5 text-center text-gray-500 decoration-gray-500 outline-gray-500"
				>
					&copy; {{ currentYear }} Advisor Tribe. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</template>
