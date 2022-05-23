import React, { Fragment, useState } from "react";

const Editproductinfo = ({ productinfo }) => {
  //editText function

  const editText = async (id, productinfo_status) => {
    try {
      const body = {new_id, product_name, quantity, codename, status : productinfo_status };

      //proxy
      await fetch(`/productinfos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [new_id, set_NewId] = useState(productinfo.id)
  const [product_name, setProduct_name] = useState(productinfo.product_name);
  const [quantity, setQuantity] = useState(productinfo.quantity);
  const [codename, setCodename] = useState(productinfo.codename);
 
  if(productinfo.status === 'red'){
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${productinfo.id}`}
      >
        Edit
      </button>
      <div
        class="modal"
        id={`id${productinfo.id}`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit productinfo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setProduct_name(productinfo.product_name)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div>
                <input
                    type="number"
                    className="form-control"
                    value={new_id}
                    onChange={(e) => set_NewId(e.target.value)}
                    placeholder={"Edit ID"}
                />
              </div>
              <div className="modal-body"></div>
              <input
                  type="text"
                  className="form-control"
                  value={product_name}
                  onChange={(e) => setProduct_name(e.target.value)}
                  placeholder={"Edit Product Name"}
              />
              
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={"Edit Quantity Name"}
              />
            </div>
            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
                placeholder={"Edit Codename"}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => editText(productinfo.id, 'red')}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setProduct_name(productinfo.product_name)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}else if(productinfo.status === 'green'){
  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${productinfo.id}`}
      >
        Edit
      </button>
      <div
        class="modal"
        id={`id${productinfo.id}`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit productinfo</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setProduct_name(productinfo.product_name)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div>
                <input
                    type="number"
                    className="form-control"
                    value={new_id}
                    onChange={(e) => set_NewId(e.target.value)}
                    placeholder={"Edit ID"}
                />
              </div>
              <div className="modal-body"></div>
              <input
                  type="text"
                  className="form-control"
                  value={product_name}
                  onChange={(e) => setProduct_name(e.target.value)}
                  placeholder={"Edit product Name"}
              />
            </div>
            <div className="modal-body">
              <input
                  type="text"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={"Edit quantity Name"}
              />
            </div>
            <div className="modal-body">
              <input
                  type="text"
                  className="form-control"
                  value={codename}
                  onChange={(e) => setCodename(e.target.value)}
                  placeholder={"Edit Codename"}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => editText(productinfo.id, 'green')}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setProduct_name(productinfo.product_name)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
};

export default Editproductinfo;
