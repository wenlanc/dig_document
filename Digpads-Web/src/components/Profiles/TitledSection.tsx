import React from 'react';
import SuiTypography from 'components/SuiTypography';

type TitledSectionProps = {
	id: string;
	title: string;
	children: React.ReactNode;
};

export default function TitledSection({
	id,
	title,
	children,
}: TitledSectionProps) {
	return (
		<section id={id}>
			<SuiTypography variant='h2' gutterBottom>
				{title}
			</SuiTypography>

			{children}
		</section>
	);
}
