import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
// import { useState } from "react";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <div> Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />

              {/* lists */}
              <Menus.List id={cabinId}>
                {/* createbutton */}
                {/* since this is not opening a modal, it is okay to 
                use it. */}
                <Menus.Button
                  onClick={handleDuplicate}
                  disabled={isCreating}
                  icon={<HiSquare2Stack />}
                >
                  Duplicate
                </Menus.Button>

                {/* edit button */}
                {/* using this means, I have to tweak with the 
                capturing phase boolean, which I prefer not to.
                also, if I use it with the menubutton. I cannot get the
                event object, Menus.button is a custom component.
                */}
                {/* <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open> */}
                {/* so buttons that open modal, are simply menubuttons, but regular buttons */}

                {/* now here is the new and better way */}
                <Modal.Open opens="edit">
                  {/* <Button icon={<HiPencil />}>Edit</Button> */}
                  {/* regular button,does not have thet style of this menubutton so
                  I used the styled button from the menu compound component and not the
                  custom button component from the menu compound */}
                  <Menus.ButtonStyle>
                    <HiPencil />
                    Edit
                  </Menus.ButtonStyle>
                </Modal.Open>

                {/* modal for delete button */}
                <Modal.Open opens="delete">
                  {/* <Button icon={<HiTrash />}>Delete</Button> */}
                  <Menus.ButtonStyle>
                    <HiTrash />
                    Delete
                  </Menus.ButtonStyle>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin}></CreateCabinForm>
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
}
export default CabinRow;
