import TicketForm from "../components/admin/support/TicketForm";
import TicketList from "../components/admin/support/TicketList";


function Support() {

    return (

        <div className="
            w-full
            max-w-[1700px]
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            xl:px-10
            py-5
            sm:py-6
            lg:py-8
        ">

            <div>

                <p className="
                    text-indigo-600
                    font-semibold
                    text-sm
                    uppercase
                    tracking-wide
                ">
                    Student Support
                </p>

                <h1 className="
                    mt-1
                    text-3xl
                    sm:text-4xl
                    font-black
                    text-slate-800
                ">
                    Help Center
                </h1>

                <p className="
                    mt-2
                    text-slate-500
                    max-w-2xl
                ">
                    Create tickets and communicate
                    with the DataWave Team.
                </p>

            </div>


            <section className="mt-8">

                <TicketForm />

            </section>


            <section className="mt-8">

                <TicketList />

            </section>


            <div className="h-6" />

        </div>

    );

}


export default Support;