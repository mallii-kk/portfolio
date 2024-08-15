"use client";

import { Suspense, useState } from "react";
import useSWR from "swr";
import { ErrorBoundary } from "react-error-boundary";
import { HeadingDivider, Loader } from "components";
import { Filter } from "./components/Filter";
import { fetcher } from "utils/fetcher";
import Error from "../error";
import { Projects } from "./components/Projects";
import Link from "next/link";
import finImage from '../../public/finance.png'
import Image from "next/image";
const url = `${process.env.NEXT_PUBLIC_SANITY_URL}${process.env.NEXT_PUBLIC_SANITY_ALL_PROJECTS}`;
const features = [
	' 📊 Interactive financial dashboard',
	' 🔁 Changeable chart types',
	// ' 🗓 Account and date filters',
	' 💹 Detailed transactions table',
	' ➕ Form to add transactions',
	' 🧩 Customizable select components',
	' 💵 Income and expense toggle',
	// ' 🔄 CSV transaction imports',
	' 🔥 API via Hono.js',
	' 🪝 State management via Tanstack React Query',
	// ' 🔗 Bank account connections with Plaid',
	// ' 💳 Premium upgrades via Lemon Squeezy',
	' 🔐 Authentication via Clerk (Core 2)',
	' 🗑 Bulk delete and search in transactions',
	// ' ⚙️ Bank disconnection and subscription management',
	' 👤 User settings customization',
	' 🌐 Built with Next.js 14',
	' 🎨 Styled with TailwindCSS and Shadcn UI',
	' 💾 PostgreSQL & Drizzle ORM',
	// ' 🚀 Deployed on Vercel'
]
export default function Page() {
	const [category, setCategory] = useState(undefined);
	const filterUrl = `${process.env.NEXT_PUBLIC_SANITY_URL}${process.env.NEXT_PUBLIC_SANITY_PROJECTS}${category}${process.env.NEXT_PUBLIC_SANITY_PROJECT_BY_CATEGORY}`;

	const fetchUrl = category ? filterUrl : url;
	const { data, error } = useSWR(fetchUrl, fetcher);
	const filteredProjects = data?.result || ["1"];

	const onClick = (catName) => setCategory(catName);

	if (error) {
		return <div className="container-md">Error loading projects...</div>;
	}

	return (
		<div className="container-md h-screen">
			<section id="projects" className="section">
				{/* <HeadingDivider title="Relevant projects" />

				<Filter onClick={onClick} /> */}

				<Suspense
					fallback={
						<div className="flex-center">
							<Loader />
						</div>
					}
				>
					<ErrorBoundary FallbackComponent={Error}>
						{filteredProjects === undefined ? (
							// Loading state
							<div className="flex-center">
								<Loader />
							</div>
						) : filteredProjects.length === 0 ? (
							// Empty state
								<div className="flex-center">
								<h3 className="text-2xl">No projects found in {category} category</h3>
							</div>
						) : (
									// <Projects projects={filteredProjects} />
									<div>

										<Link href={"https://finance-alpha-two.vercel.app"} className="m-2">
											<HeadingDivider title="Finance" />
										</Link>

										<div className="flex flex-col gap-3 ">
											<div className="w-full md:w-[50%] ">
												<Image src={finImage} width="100%" height="auto" alt="Finance Image"></Image>
											</div>
											<div>
												<ul>
													{features.map((feature, index) => (<li key={index}>{feature}</li>))}
												</ul>
											</div>
										</div>
									</div>	

						)}
					</ErrorBoundary>
				</Suspense>
			</section>
		</div>
	);
}
