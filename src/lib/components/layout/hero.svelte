<script lang="ts">
	interface HeroItem {
		id: string;
		title: string;
		image: string;
		type: 'product' | 'service';
	}

	interface Props {
		items: HeroItem[];
	}

	let { items }: Props = $props();
</script>

<section class="relative w-full min-h-screen bg-background flex items-center justify-center overflow-hidden py-20 pt-32">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<h1 class="font-header text-xl md:text-8xl tracking-wider text-foreground mb-4">
				Komodo Future Solutions
			</h1>
		</div>

		<div class="relative flex items-center justify-center gap-8 flex-wrap max-w-7xl mx-auto">
			{#each items as item, index (item.id)}
				<div
					class="diamond-container"
					style="--delay: {index * 0.1}s;"
				>
					<div class="diamond-wrapper rotate-45 overflow-hidden">
						<div class="diamond-content -rotate-45">
							<img
								src={item.image}
								alt={item.title}
								class="w-full h-full object-cover"
							/>
							<div class="diamond-overlay">
								<span class="font-header text-sm md:text-base tracking-widest uppercase">
									{item.title}
								</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="text-center mt-16">
			<button
				class="px-8 py-3 border-2 border-foreground text-foreground font-header text-sm tracking-widest
				uppercase hover:bg-foreground hover:text-background transition-all duration-300"
			>
				SHOP ALL
			</button>
		</div>
	</div>
</section>

<style>
	.diamond-container {
		position: relative;
		width: 280px;
		height: 280px;
	}

	.diamond-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		border: 2px solid hsl(var(--komodo-electric-cyan));
		box-shadow: 0 0 20px hsl(var(--komodo-electric-cyan) / 0.3);
		transition: all 0.3s ease;
	}

	.diamond-wrapper:hover {
		border-color: hsl(var(--komodo-fuchsia));
		box-shadow: 0 0 30px hsl(var(--komodo-fuchsia) / 0.5);
	}

	.diamond-content {
		width: 141.42%;
		height: 141.42%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-45deg);
	}

	.diamond-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			hsl(var(--komodo-cyber-blue) / 0.9) 0%,
			transparent 50%
		);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding: 1.5rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.diamond-wrapper:hover .diamond-overlay {
		opacity: 1;
	}

	.diamond-overlay span {
		color: hsl(var(--komodo-electric-cyan));
		text-shadow: 0 0 10px hsl(var(--komodo-electric-cyan) / 0.5);
	}

	@media (max-width: 768px) {
		.diamond-container {
			width: 200px;
			height: 200px;
		}
	}
</style>
