"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import { HeadingDivider } from "components";
import { TimeLine } from "./TimeLine";

export function AboutSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	return (
		<LazyMotion features={domAnimation}>
			<section id="about" className="section">
				<HeadingDivider title="About me" />
				<div className="pt-10 pb-16 max-w-5xl flex flex-col gap-3">
					<div
						tabIndex="0"
						ref={ref}
						className="text-xl font-light leading-relaxed"
						style={{
							transform: isInView ? "none" : "translateX(-200px)",
							opacity: isInView ? 1 : 0,
							transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
						}}
					>
						{/* My name is Mallik, and I graduated from Visvesvaraya Technological University. */}
						<p className="my-3.5 font-bold text-md md:2xl">
							Turning vision into reality with code and design.
						</p>
						<p className="my-3.5 font-semibold text-md md:2xl">
							As a skilled full-stack developer, I am dedicated to turning ideas into innovative web
							applications. Explore my latest projects and articles, showcasing my expertise in
							React.js and web development.
						</p>
					</div>
				</div>

				<TimeLine />
			</section>
		</LazyMotion>
	);
}
