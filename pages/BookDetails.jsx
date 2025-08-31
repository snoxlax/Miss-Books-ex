const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export default function BookDetails() {
  const { id } = useParams();
  return <div>BookDetails {id}</div>;
}
