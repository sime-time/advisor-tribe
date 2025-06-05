<template>
  <div class="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <!-- side bar -->
    <div class="hidden md:block border-r border-accented bg-elevated/60 ">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b border-accented px-4 lg:h-[60px] lg:px-6">
          <NuxtLink to="/" class="flex items-center gap-2">
            <img src="/logo.webp" alt="logo" class="size-10" height="100" width="100">
            <p class="text-xl font-bold">
              Advisor<span class="text-primary-600">Tribe</span>
            </p>
          </NuxtLink>
        </div>

        <div class="flex-1">
          <nav class="grid items-start px-2 lg:px-4">
            <DashboardLinks />
          </nav>
        </div>
      </div>
    </div>

    <!-- top nav bar for mobile -->
    <div class="flex flex-col">
      <header class="flex h-14 items-center gap-4 border-b border-accented bg-elevated/60 px-4 lg:h-[60px] lg:px-6">
        <UDrawer direction="left">
          <UButton
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-menu"
            size="lg"
            class="md:hidden shrink-0"
          />
          <template #body>
            <div class="flex flex-col">
              <nav class="grid gap-2">
                <DashboardLinks />
              </nav>
            </div>
          </template>
        </UDrawer>

        <div class="ml-auto">
          <DashboardDropdown />
        </div>
      </header>

      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-screen">
        <slot />
      </main>
    </div>
  </div>
</template>
